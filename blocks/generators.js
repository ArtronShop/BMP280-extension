Blockly.Python['bmp280_read_pressure'] = function(block) {
  Blockly.Python.definitions_['import_BMP280'] = 'import BMP280';

  var dropdown_addr = block.getFieldValue('addr');

  var code = `BMP280.read(addr=${dropdown_addr})[0]`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['bmp280_read_temperature'] = function(block) {
  Blockly.Python.definitions_['import_BMP280'] = 'import BMP280';

  var dropdown_addr = block.getFieldValue('addr');

  var code = `BMP280.read(addr=${dropdown_addr})[1]`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['bmp280_read_altitude'] = function(block) {
  Blockly.Python.definitions_['import_BMP280'] = 'import BMP280';
  
  var dropdown_addr = block.getFieldValue('addr');
  var value_seaLevelhPa = Blockly.Python.valueToCode(block, 'seaLevelhPa', Blockly.Python.ORDER_ATOMIC);

  var code = `BMP280.altitude(${value_seaLevelhPa}, addr=${dropdown_addr})`;
  return [code, Blockly.Python.ORDER_NONE];
};

const getBMP280FunctionName = () => {
  Blockly.JavaScript.definitions_['include']['Adafruit_BMP280.h'] = '#include <Adafruit_BMP280.h>';

  Blockly.JavaScript.definitions_['define']['bmp'] = `Adafruit_BMP280 bmp;`;

  return Blockly.JavaScript.provideFunction_(
    'BMP280_read',
    [
      'float ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(int addr, uint8_t type, float param = 0) {',
      '  static bool init = false;',
      '  if (!init) {',
      '    if (!bmp.begin(addr)) {',
      '      return -999.0;',
      '    }',
      '    bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */',
      '                    Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */',
      '                    Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */',
      '                    Adafruit_BMP280::FILTER_X16,      /* Filtering. */',
      '                    Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */',
      '    init = true;',
      '  }',
      '  if (type == 0) return bmp.readPressure();',
      '  if (type == 1) return bmp.readTemperature();',
      '  if (type == 2) return bmp.readAltitude(param);',
      '  return -999.0;',
      '}'
    ]
  );
}

Blockly.JavaScript['bmp280_read_pressure'] = function(block) {
  var dropdown_addr = block.getFieldValue('addr');

  var code = `${getBMP280FunctionName()}(${dropdown_addr}, 0)`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['bmp280_read_temperature'] = function(block) {
  var dropdown_addr = block.getFieldValue('addr');

  var code = `${getBMP280FunctionName()}(${dropdown_addr}, 1)`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['bmp280_read_altitude'] = function(block) {
  var dropdown_addr = block.getFieldValue('addr');
  var value_seaLevelhPa = Blockly.JavaScript.valueToCode(block, 'seaLevelhPa', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `${getBMP280FunctionName()}(${dropdown_addr}, 2, ${value_seaLevelhPa})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};


