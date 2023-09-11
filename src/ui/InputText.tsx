import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import {useEffect, useState} from 'react';
import { getNameOfDeclaration } from 'typescript';
import { colorType } from '../services/Color';
 
type TextInputProps = {
  // color : colorType,
  getName : (value : string) => void,
  text : string,
  placeholder : string,
  // getName : (value : string) => void
}

export function InputWithButton(props: TextInputProps) {
  const theme = useMantineTheme();
  const [name , setName] = useState<string>(props.text);
  const [placeholder, setPlaceholder] = useState<string> (props.placeholder)

  // useEffect(()=>{
  //   if (props.text !== "") setName(props.text);

  // },[])

  const handleClick = () => {
    props.getName(name);
    setName("");
    setPlaceholder("");
  }

  return (

    <TextInput
      radius="xl"
      size="md"

      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled" onClick={ handleClick } >

          {theme.dir === 'ltr' ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder={placeholder}
      rightSectionWidth={42}
      value={name}
      onChange = {(e:any)=> setName(e.target.value) }
    />
  );
}