input.onButtonPressed(Button.A, function () {
    MuseIoT.mqttPublish("hkt/light_1_switch", "on")
})
input.onButtonPressed(Button.AB, function () {
    MuseOLED.clear()
})
input.onButtonPressed(Button.B, function () {
    MuseIoT.mqttPublish("hkt/light_1_switch", "off")
})
let gas = ""
let humi = ""
let temp = ""
let voc = ""
let co = ""
let pressure = ""
let dust = ""
let co2 = ""
basic.showNumber(0)
MuseIoT.initializeWifi()
MuseIoT.setWifi("your ssid", "wifi password")
basic.showNumber(1)
basic.pause(10000)
MuseIoT.connectgeneralMQTT(
"18.163.126.160",
"1883",
"001",
"siot",
"dfrobot"
)
basic.showNumber(2)
basic.pause(5000)
MuseIoT.mqttSubscribe("hkt/iaq_status")
basic.showNumber(3)
basic.pause(2000)
let iaq_strings = MuseIoT.mqttInbound()
basic.forever(function () {
    basic.pause(5000)
    iaq_strings = MuseIoT.mqttInbound()
    co2 = iaq_strings.substr(0, 4)
    dust = iaq_strings.substr(4, 4)
    pressure = iaq_strings.substr(8, 4)
    co = iaq_strings.substr(12, 4)
    voc = iaq_strings.substr(16, 4)
    temp = iaq_strings.substr(20, 4)
    humi = iaq_strings.substr(24, 4)
    gas = iaq_strings.substr(28, 4)
    MuseOLED.writeStringNewLine("co2: " + co2 + "ppm")
    MuseOLED.writeStringNewLine("dust: " + dust + "ug/m3")
    MuseOLED.writeStringNewLine("pressure: " + pressure + "hPa")
    MuseOLED.writeStringNewLine("co:" + co + "ppm")
    MuseOLED.writeStringNewLine("voc: " + voc + "ppm")
    MuseOLED.writeStringNewLine("temp: " + temp + "c")
    MuseOLED.writeStringNewLine("humi: " + humi + "%")
    MuseOLED.writeStringNewLine("gas: " + gas + "ppm")
})
