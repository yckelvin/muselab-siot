def on_button_pressed_a():
    MuseIoT.mqtt_publish("hkt/light_1_switch", "on")
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    MuseOLED.clear()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    MuseIoT.mqtt_publish("hkt/light_1_switch", "off")
input.on_button_pressed(Button.B, on_button_pressed_b)

gas = ""
humi = ""
temp = ""
voc = ""
co = ""
pressure = ""
dust = ""
co2 = ""
basic.show_number(0)
MuseIoT.initialize_wifi()
MuseIoT.set_wifi("your ssid", "wifi password")
basic.show_number(1)
basic.pause(10000)
MuseIoT.connectgeneral_mqtt("18.163.126.160", "1883", "001", "siot", "dfrobot")
basic.show_number(2)
basic.pause(5000)
MuseIoT.mqtt_subscribe("hkt/iaq_status")
basic.show_number(3)
basic.pause(2000)
iaq_strings = MuseIoT.mqtt_inbound()

def on_forever():
    global iaq_strings, co2, dust, pressure, co, voc, temp, humi, gas
    basic.pause(5000)
    iaq_strings = MuseIoT.mqtt_inbound()
    co2 = iaq_strings.substr(0, 4)
    dust = iaq_strings.substr(4, 4)
    pressure = iaq_strings.substr(8, 4)
    co = iaq_strings.substr(12, 4)
    voc = iaq_strings.substr(16, 4)
    temp = iaq_strings.substr(20, 4)
    humi = iaq_strings.substr(24, 4)
    gas = iaq_strings.substr(28, 4)
    MuseOLED.write_string_new_line("co2: " + co2 + "ppm")
    MuseOLED.write_string_new_line("dust: " + dust + "ug/m3")
    MuseOLED.write_string_new_line("pressure: " + pressure + "hPa")
    MuseOLED.write_string_new_line("co:" + co + "ppm")
    MuseOLED.write_string_new_line("voc: " + voc + "ppm")
    MuseOLED.write_string_new_line("temp: " + temp + "c")
    MuseOLED.write_string_new_line("humi: " + humi + "%")
    MuseOLED.write_string_new_line("gas: " + gas + "ppm")
basic.forever(on_forever)
