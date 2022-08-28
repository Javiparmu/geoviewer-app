import { Icon, Slider } from 'react-native-elements'
import { View } from 'react-native'
import { getColors } from '../helpers'

export const SliderSettings = ({ maxValue, value, setValue, sliderPos }) => {
  const colors = getColors()
  return (
    <>
      <Slider
        value={value[sliderPos]}
        onValueChange={(value) => setValue((prev) => {
          const newValue = [...prev]
          newValue[sliderPos] = value
          return newValue
        })}
        animateTransitions
        maximumValue={maxValue}
        minimumValue={0}
        step={1}
        allowTouchTrack
        trackStyle={{ height: 3, width: 90, backgroundColor: 'transparent', overflow: 'hidden', marginRight: 15 }}
        maximumTrackTintColor={'#BDBDBD'}
        minimumTrackTintColor={'#BDBDBD'}
        thumbStyle={{ height: 15, width: 15, backgroundColor: 'transparent', marginLeft: -5}}
        thumbProps={{
          children: (
            <Icon
              name="circle"
              type="font-awesome"
              size={15}
              color={colors.text}
            />
          ),
        }}
      />
      <View style={{ width: 4, height: 4, borderRadius: 30, position: 'absolute', left: 0, backgroundColor: colors.text }} />
      <View style={{ width: 4, height: 4, borderRadius: 30, position: 'absolute', left: 30, backgroundColor: colors.text }} />
      <View style={{ width: 4, height: 4, borderRadius: 30, position: 'absolute', left: 60, backgroundColor: colors.text }} />
      <View style={{ width: 4, height: 4, borderRadius: 30, position: 'absolute', left: 90, backgroundColor: colors.text }} />
    </>
  )
}