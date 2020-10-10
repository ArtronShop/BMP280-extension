Blockly.Python['bmp280_read_pressure'] = function(block) {
  Blockly.Python.definitions_['import_BMP280'] = 'import BMP280';

  var code = `BMP280.read()[0]`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['bmp280_read_temperature'] = function(block) {
  Blockly.Python.definitions_['import_BMP280'] = 'import BMP280';

  var code = `BMP280.read()[1]`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['bmp280_read_altitude'] = function(block) {
  Blockly.Python.definitions_['import_BMP280'] = 'import BMP280';

  var code = `BMP280.altitude()`;
  return [code, Blockly.Python.ORDER_NONE];
};
