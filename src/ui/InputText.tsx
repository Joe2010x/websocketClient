import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import {useState} from 'react';
import { getNameOfDeclaration } from 'typescript';
import { colorType } from '../services/Color';
 
type TextInputProps = {
  // color : colorType,
  getName : (value : string) => void,
  text : string,
  // getName : (value : string) => void
}

export function InputWithButton(props: TextInputProps) {
  const theme = useMantineTheme();
  const [name , setName] = useState<string>("");

  const handleClick = () => {
    console.log(name+"from inputbox");
    props.getName(name);
    setName("");
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
      placeholder={props.text}
      rightSectionWidth={42}
      onChange = {(e:any)=> setName(e.target.value) }
    />
  );
}