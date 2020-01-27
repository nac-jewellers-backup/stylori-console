import React from 'react';
import styled from '@emotion/styled';
import Select from 'react-select';
import { View, Text} from "react-primitives";
import "../screens/Productupload/Productupload.css"

const PlaceholderText = styled(Text)(({ placeholderUp, placeholderzindex, isDisabled }) => ({
  position: 'absolute',
  transition: 'all .25s',
  pointerEvents: 'none',
  top: placeholderUp ? -8 : 10,
  left: 8,
  zIndex: placeholderzindex,
  paddingLeft: 8,
  paddingRight: 8,
  backgroundColor: isDisabled ? 'transparent' : '#FFFFFF',
  fontSize: placeholderUp ? 12 : 15,
  color: placeholderUp ? '#3F51B5' : '#263238',
}));

const SelectContainer = styled(View)(({ selectzindex }) => ({
  position: 'relative',
  display: 'flex',
  zIndex: selectzindex
}));

const SelectView = props => {
  const { placeholder, placeholderUp, placeholderzindex, selectzindex, isDisabled } = props;
  return (
    <SelectContainer selectzindex={selectzindex}>
      <Select 
        fullWidth
        isClearable
      {...props} placeholder="" />
      <PlaceholderText placeholderUp={placeholderUp} isDisabled={isDisabled} placeholderzindex={placeholderzindex}>{placeholder}</PlaceholderText>
    </SelectContainer>
  );
};

class SelectPlaceholder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderUp: false,
      placeholderzindex : 1
    };
  }

  onFocus = () => {
    const { onFocus } = this.props;
    this.setState({ placeholderUp: true });
    onFocus && onFocus();
  };

  onBlur = () => {
    const { value, onBlur } = this.props;
    onBlur && onBlur();
  };

  render() {
    return (
      <SelectView
      className={'dropdownlayout'}
        fullWidth
        {...this.props}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    );
  }
}

export default SelectPlaceholder;