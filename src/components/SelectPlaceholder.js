import React from 'react';
import styled from '@emotion/styled';
import Select from 'react-select';
import { View, Text} from "react-primitives";
import "../screens/Productupload/Productupload.css"

const PlaceholderText = styled(Text)(({ placeholderUp }) => ({
  position: 'absolute',
  transition: 'all .25s',
  pointerEvents: 'none',
  top: placeholderUp ? -8 : 10,
  left: 8,
  zIndex: 10,
  paddingLeft: 8,
  paddingRight: 8,
  backgroundColor: '#FFFFFF',
  fontSize: placeholderUp ? 12 : 15,
  color: placeholderUp ? '#3F51B5' : '#cccccc',
}));

const SelectContainer = styled(View)({
  position: 'relative',
  height: 55,
  display: 'flex',
  zIndex: 4
});

const SelectView = props => {
  const { placeholder, placeholderUp } = props;
  return (
    <SelectContainer>
      <Select 
        fullWidth
      {...props} placeholder="" />
      <PlaceholderText placeholderUp={placeholderUp}>{placeholder}</PlaceholderText>
    </SelectContainer>
  );
};

class SelectPlaceholder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderUp: false,
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
        fullWidth
        {...this.props}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    );
  }
}

export default SelectPlaceholder;