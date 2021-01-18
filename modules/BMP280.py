from machine import Pin, I2C
from ustruct import unpack as unp
import utime
import os
 
# Author David Wahlund david@dafnet.se

class BMP280:
    def __init__(self, i2c_bus, addr=0x76):
        self._bmp_i2c = i2c_bus
        self._i2c_addr = addr

        self._T1 = unp('<H', self._read(0x88, 2))[0]
        self._T2 = unp('<h', self._read(0x8A, 2))[0]
        self._T3 = unp('<h', self._read(0x8C, 2))[0]
        self._P1 = unp('<H', self._read(0x8E, 2))[0]
        self._P2 = unp('<h', self._read(0x90, 2))[0]
        self._P3 = unp('<h', self._read(0x92, 2))[0]
        self._P4 = unp('<h', self._read(0x94, 2))[0]
        self._P5 = unp('<h', self._read(0x96, 2))[0]
        self._P6 = unp('<h', self._read(0x98, 2))[0]
        self._P7 = unp('<h', self._read(0x9A, 2))[0]
        self._P8 = unp('<h', self._read(0x9C, 2))[0]
        self._P9 = unp('<h', self._read(0x9E, 2))[0]
 
        self._t_os = 2  # temperature oversampling
        self._p_os = 5  # pressure oversampling
 
        # output raw
        self._t_raw = 0
        self._t_fine = 0
        self._t = 0
 
        self._p_raw = 0
        self._p = 0
 
        self._read_wait_ms = 100  # interval between forced measure and readout
        self._new_read_ms = 200  # interval between
        self._last_read_ts = 0
 
    def _read(self, addr, size=1):
        return self._bmp_i2c.readfrom_mem(self._i2c_addr, addr, size)
 
    def _write(self, addr, b_arr):
        if not type(b_arr) is bytearray:
            b_arr = bytearray([b_arr])
        return self._bmp_i2c.writeto_mem(self._i2c_addr, addr, b_arr)
 
    def _gauge(self):
        now = utime.ticks_ms()
        if utime.ticks_diff(now, self._last_read_ts) > self._new_read_ms:
            self._last_read_ts = now
            r = self._t_os + (self._p_os << 3) + (1 << 6)
            self._write(0xF4, r)
            utime.sleep_ms(100)  # TODO calc sleep
            d = self._read(0xF7, 6)  # read all data at once (as by spec)
 
            self._p_raw = (d[0] << 12) + (d[1] << 4) + (d[2] >> 4)
            self._t_raw = (d[3] << 12) + (d[4] << 4) + (d[5] >> 4)
 
            self._t_fine = 0
            self._t = 0
            self._p = 0
 
    def _calc_t_fine(self):
        # From datasheet page 22
        self._gauge()
        if self._t_fine == 0:
            var1 = (((self._t_raw >> 3) - (self._T1 << 1)) * self._T2) >> 11
            var2 = (((((self._t_raw >> 4) - self._T1) * ((self._t_raw >> 4) - self._T1)) >> 12) * self._T3) >> 14
            self._t_fine = var1 + var2
 
    @property
    def temperature(self):
        self._calc_t_fine()
        if self._t == 0:
            self._t = ((self._t_fine * 5 + 128) >> 8) / 100.
        return self._t
 
    @property
    def pressure(self):
        # From datasheet page 22
        self._calc_t_fine()
        if self._p == 0:
            var1 = self._t_fine - 128000
            var2 = var1 * var1 * self._P6
            var2 = var2 + ((var1 * self._P5) << 17)
            var2 = var2 + (self._P4 << 35)
            var1 = ((var1 * var1 * self._P3) >> 8) + ((var1 * self._P2) << 12)
            var1 = (((1 << 47) + var1) * self._P1) >> 33
 
            if var1 == 0:
                return 0
 
            p = 1048576 - self._p_raw
            p = int((((p << 31) - var2) * 3125) / var1)
            var1 = (self._P9 * (p >> 13) * (p >> 13)) >> 25
            var2 = (self._P8 * p) >> 19
 
            p = ((p + var1 + var2) >> 8) + (self._P7 << 4)
            self._p = p / 256.0
        return round(self._p * 0.01, 2) # P -> hPa

machine = os.uname().machine
if "KidBright32" in machine:
    i2c1 = I2C(1, scl=Pin(5), sda=Pin(4), freq=100000)
else:
    i2c1 = I2C(0, scl=Pin(22), sda=Pin(21), freq=100000)

bmp = BMP280(i2c1)

def read():
    return (bmp.pressure, bmp.temperature)

def altitude(seaLevelhPa):
    return round(44330 * (1.0 - pow(bmp.pressure / seaLevelhPa, 0.1903)), 2)
