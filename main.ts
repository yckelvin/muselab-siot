input.onButtonPressed(Button.A, function () {
    MuseIoT.mqttPublish("hkt/light_1_switch", "on")
})
input.onButtonPressed(Button.AB, function () {
    MuseOLED.clear()
    MuseOLED.writeStringNewLine("Reading data...")
    MuseIoT.mqttSubscribe("hkt/CO2")
    basic.pause(5000)
    MuseOLED.writeStringNewLine("co2: " + MuseIoT.mqttInbound() + "ppm")
    getDust()
})
input.onButtonPressed(Button.B, function () {
    MuseIoT.mqttPublish("hkt/light_1_switch", "off")
})
function getDust () {
    MuseIoT.mqttSubscribe("hkt/Dust")
    basic.pause(5000)
    MuseOLED.writeStringNewLine("dust: " + MuseIoT.mqttInbound() + "ug/m3")
}
basic.showNumber(0)
MuseIoT.initializeWifi()
MuseIoT.setWifi("KLHOME", "127214529")
basic.showNumber(1)
basic.pause(10000)
MuseIoT.connectgeneralMQTT(
"18.163.126.160",
"1883",
"001",
"siot",
"dfrobot"
)
basic.pause(5000)
basic.showNumber(2)
MuseOLED.clear()
MuseOLED.writeStringNewLine("Muse SIoT Ready")
