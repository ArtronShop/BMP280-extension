({
    name: "BMP280", // Category Name
    description: "Pressure sensor",
    author: "IOXhop.com",
    category: "Sensors",
    version: "1.0.0",
    icon: "/static/icon.png", // Category icon
    color: "#672e58", // Category color (recommend some blocks color)
    blocks: [ // Blocks in Category
        "bmp280_read_altitude",
        "bmp280_read_pressure",
        "bmp280_read_temperature"
    ]
});
