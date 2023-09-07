import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

type TextInputProps = {
  // color : string [],
  text : string,
  // getName : (value : string) => void
}

export function InputWithButton(props: TextInputProps) {
  const theme = useMantineTheme();

  return (

    <TextInput
      radius="xl"
      size="md"

      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
          {theme.dir === 'ltr' ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder={props.text}
      rightSectionWidth={42}
    />
  );
}