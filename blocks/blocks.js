Blockly.defineBlocksWithJsonArray([
{
  "type": "bmp280_read_pressure",
  "message0": "BMP280 (Address %1) pressure (hPa)",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "type",
      "options": [
        [ "0x76", "0x76" ],
        [ "0x77", "0x77" ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": "#672e58",
  "tooltip": "Read pressure from BMP280 in hPa",
  "helpUrl": ""
},
{
  "type": "bmp280_read_temperature",
  "message0": "BMP280 (Address %1) temperature (°C)",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "type",
      "options": [
        [ "0x76", "0x76" ],
        [ "0x77", "0x77" ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": "#672e58",
  "tooltip": "Read temperature from BMP280 in celsius",
  "helpUrl": ""
},
{
  "type": "bmp280_read_altitude",
  "message0": "BMP280 (Address %1) altitude (m) (sea level=  %2 hPa)",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "type",
      "options": [
        [ "0x76", "0x76" ],
        [ "0x77", "0x77" ]
      ]
    },
    {
      "type": "input_value",
      "name": "seaLevelhPa"
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": "#672e58",
  "tooltip": "Read altitude from BMP280 in hPa",
  "helpUrl": ""
}
]);
