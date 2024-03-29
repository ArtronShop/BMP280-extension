({
    name: "BMP280", // Category Name
    description: "Pressure sensor",
    author: "ArtronShop",
    category: "Sensors",
    version: "1.1.0",
    icon: "/static/icon.png", // Category icon
    color: "#672e58", // Category color (recommend some blocks color)
    blocks: [ // Blocks in Category
        {
            xml: `
                <block type="bmp280_read_altitude">
                    <value name="seaLevelhPa">
                        <shadow type="math_number">
                            <field name="NUM">1013.25</field>
                        </shadow>
                    </value>
              </block>
              `
        },
        "bmp280_read_pressure",
        "bmp280_read_temperature"
    ], 
    supportArduinoPlatform: true,
    depends: [ // Arduino library
        "Adafruit BMP280 Library@2.6.8",
        "Adafruit Unified Sensor@1.1.14",
        "Adafruit BusIO@1.15.0"
    ]
});
