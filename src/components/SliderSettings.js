import { Icon, Slider } from 'react-native-elements'
import { View } from 'react-native'
import { getColors } from '../helpers'
import { useDispatch, useSelector } from 'react-redux'
import { setSliderValue } from '../store/geoviewer/sideMenuSlice'

export const SliderSettings = ({ maxValue, sliderPos }) => {

  const dispatch = useDispatch()
  const { sliderValues } = useSelector(state => state.sideMenu) 

  const colors = getColors()

  return (
    <>
      <Slider
        value={sliderValues[sliderPos]}
        onValueChange={(value) => dispatch(setSliderValue({ index: sliderPos, value }))}
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