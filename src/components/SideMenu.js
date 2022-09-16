import { Dimensions, Platform, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Divider, Switch } from 'react-native-elements'
import { SliderSettings } from './SliderSettings'
import { Dropdown } from 'react-native-element-dropdown'
import { Ionicons } from '@expo/vector-icons'
import { SideMenuAnimations } from '../resources'
import { getColors } from '../helpers'
import { sideMenuStyles } from '../themes'
import { useDispatch, useSelector } from 'react-redux'
import { setSlidersValues } from '../store'
import { setMapType, setSliderValues } from '../store/geoviewer/sideMenuSlice'

const dropDownData = [
  { value: '1', label: 'Ios Maps (MapKit)' },
  { value: '2', label: 'Google Maps' },
]

export const SideMenu = () => {

  const [isFocus, setIsFocus] = useState(false)
  const [sideMenuXPosition, setSideMenuXPosition] = useState(-Dimensions.get('window').width)

  const dispatch = useDispatch()
  const { isOpen, sliderValues, mapType } = useSelector(state => state.sideMenu)

  const colors = getColors()
  const styles = sideMenuStyles(colors)

  useEffect(() => {
    const position = SideMenuAnimations(isOpen)
    setSideMenuXPosition(position)
  }, [isOpen])

  return (
    <View style={[styles.menu, { right: sideMenuXPosition }]}>
      <View style={{ flexDirection: 'column' }}>
        {
          Platform.OS === 'ios' &&
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <Text style={{ color: colors.text, marginRight: 10, fontSize: 16 }}>Mapa:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Dropdown
                style={[ styles.dropdown, isFocus && { borderColor: '#2089DC' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={dropDownData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? dropDownData[0].label : '...'}
                value={mapType}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  dispatch(setMapType(item.value));
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <Ionicons
                    style={styles.icon}
                    color={isFocus ? '#2089DC' : colors.dropdowntext}
                    name="map-outline"
                    size={20}
                  />
                )}
              />
            </View>
          </View>
        }
        {
          (mapType === '2' || Platform.OS === 'android') ?
            <>
              {Platform.OS === 'ios' && <Divider />}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
                <Text style={{ color: colors.text, marginRight: 10, fontSize: 16 }}>Puntos de interés: </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <SliderSettings
                    maxValue={3}
                    type='landmarks'
                    sliderPos={0}
                  />
                </View>
              </View>
              <Divider />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
                <Text style={{ color: colors.text, marginRight: 10, fontSize: 16 }}>Carreteras: </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <SliderSettings
                    maxValue={3}
                    type="roads"
                    sliderPos={1}
                  />
                </View>
              </View>
              <Divider />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
                <Text style={{ color: colors.text, marginRight: 10, fontSize: 16 }}>Etiquetas: </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <SliderSettings
                    maxValue={3}
                    type='labels'
                    sliderPos={2}
                  />
                </View>
              </View>
              <Divider />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
                <Text style={{ color: colors.text, marginRight: 10, fontSize: 16 }}>Tráfico: </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Switch
                    value={sliderValues[3]}
                    onValueChange={(value) => dispatch(setSliderValues(
                      [...sliderValues.slice(0, 3), value]
                    ))}
                    style={{ transform: [{ scaleX: .9 }, { scaleY: .9 }] }}
                  />
                </View>
              </View>
            </>
            :
            <>
              <Divider />
              <Text style={{ color: colors.iconDisabled, marginRight: 10, fontSize: 16, marginVertical: 6, textAlign: 'center' }} >Configuración no disponible.</Text>
            </>
        }
      </View>
    </View>
  )
}