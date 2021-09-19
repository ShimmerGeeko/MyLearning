import React from "react";
import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";
import { Input, MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
// import Select from "@material-ui/core/Select";
// import { Input as InputField } from "antd";
import ReactHookFormSelect from "./ReactHookFormSelect";

export default function formHook() {
  const { control, register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={Input}
        name='HelloWorld'
        control={control}
        defaultValue=''
        ref={register({ required: true })}
      />
      {/* <Controller as={InputField} name="AntdInput" control={control} defaultValue="" /> */}
      {/* <Controller
        as={Select}
        name="reactSelect"
        control={control}
        onChange={([selected]) => {
          // React Select return object instead of value for selection
          return { value: selected };
        }}
        defaultValue={{}}
      /> */}

      <ReactHookFormSelect
        id='numero_prestacao'
        name='numero_prestacao'
        //   className={classes.textField}
        label='Em quantas parcelas?'
        control={control}
        //   defaultValue={numero_prestacao || ""}
        defaultValue=''
        variant='outlined'
        margin='normal'>
        <MenuItem value=''>Escolha uma opção</MenuItem>
        <MenuItem value='3'>03 parcelas</MenuItem>
        <MenuItem value='6'>06 parcelas</MenuItem>
        <MenuItem value='9'>09 parcelas</MenuItem>
        <MenuItem value='12'>12 parcelas</MenuItem>
        <MenuItem value='16'>16 parcelas</MenuItem>
        <MenuItem value='18'>18 parcelas</MenuItem>
      </ReactHookFormSelect>

      <FormControl>
        <InputLabel>Custom Select</InputLabel>
        <Controller
          as={
            <Select >
              <MenuItem value=''>Select</MenuItem>
              <MenuItem value='3'>MenuItem 03</MenuItem>
              <MenuItem value='6'>MenuItem 06</MenuItem>
              <MenuItem value='9'>MenuItem 09</MenuItem>
              <MenuItem value='12'>MenuItem 12</MenuItem>
              <MenuItem value='16'>MenuItem 16</MenuItem>
              <MenuItem value='18'>MenuItem 18</MenuItem>
            </Select>
          }
          name='customSelect'
          control={control}
          defaultValue=''
        />
      </FormControl>

      <input type='submit' />
    </form>
  );
}
