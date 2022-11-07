import React, { useState } from 'react';
import { AsYouType, parseDigits } from 'libphonenumber-js'
import styles from './PhoneNumberInput.module.scss'
const asYouType = new AsYouType('US')

const PhoneNumberInput = ({ register, setValue, getValues, error }) => {
    const [wasFormatted, setFormatted] = useState(false);

    const formatPhone = React.useCallback((v: string) => {
        const digits = parseDigits(v)
        if (digits.length >= 10) {
            const formatter = new AsYouType('US');
            return formatter.input(digits)
        }
        return digits;
    }, [])

    const onPhoneChange = (e) => {
        let caret = e.target.selectionStart;
        const element = e.target;
        const rawPhoneValue = getValues('phone');
        const formatted = formatPhone(rawPhoneValue);
        console.log(caret, formatted.length, rawPhoneValue.length,)
        let nextCaret = caret;

        //TODO: simpilfy
        if (rawPhoneValue.length === 10 && caret > 0 && formatted.length === 14) {
            console.log('setting caret', caret + 4)
            if (caret > 0) {
                nextCaret++
                console.log('1 setting caret', nextCaret)
            }
            if (caret > 2) {
                nextCaret++
                console.log('3 setting caret', nextCaret)
            }
            if (caret > 3) {
                nextCaret++
                console.log('4 setting caret', nextCaret)
            }
            if (caret > 6) {
                nextCaret++
                console.log('8 setting caret', nextCaret)
            }
            caret = nextCaret
            setFormatted(true);
        } else if (rawPhoneValue.length !== formatted.length && wasFormatted) {
            if (caret > 0) {
                console.log('0 setting caret', nextCaret - 1)

                nextCaret--
            }
            if (caret > 3) {
                console.log('3 setting caret', nextCaret - 1)

                nextCaret--
            }
            if (caret > 5) {
                console.log('5 setting caret', nextCaret - 1)

                nextCaret--
            }
            if (caret > 8) {
                console.log('8 setting caret', nextCaret - 1)

                nextCaret--
            }
            caret = nextCaret
            setFormatted(false);
        }
        setValue('phone', formatted)
        window.requestAnimationFrame(() => {
            element.selectionStart = caret
            element.selectionEnd = caret
        })
    }

    //TODO: fix on backspace and delete key on empty or () areas of formatted string
    const handleKeyDown = e => {
        const allowedKeys = [
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "Backspace",
            "Home",
            "End",
            "Enter",
            "Tab"
        ];
        if (e.key === "Delete") {
            let caret = e.target.selectionStart;
            const element = e.target;
            const rawPhoneValue = getValues('phone');
            const formatted = formatPhone(rawPhoneValue);
            console.log(rawPhoneValue, formatted);
            const digits = parseDigits(rawPhoneValue)

            console.log(digits,caret, formatted.length, rawPhoneValue.length,)
            let nextCaret = caret;

            window.requestAnimationFrame(() => {
                element.selectionStart = caret-1
                element.selectionEnd = caret-1
            })

            //keyIsDelete.current = true;
        } else if (e.key === "Backspace") {

        } else {
            //keyIsDelete.current = false;
        }
        if ("0123456789".includes(e.key) || allowedKeys.includes(e.key)) {
        } else {
            e.preventDefault();
        }
    };

    return (<>
        <label htmlFor="phone" className={styles.form_label}>
            <span>Phone number</span>
            <input
                id="phone"
                type="tel"
                placeholder="(___) ___-____"
                className={styles.form_input}
                aria-required="true"
                onChange={onPhoneChange}
                onKeyDown={handleKeyDown}
                {...register('phone', {
                    required: true,
                    onChange: v => { onPhoneChange(v) }
                })}
            />
        </label>
        {error && <span className="zcr__error" role="alert">Error: Please enter a valid phone number</span>}

    </>)
}
export default PhoneNumberInput;
/*
{/*...register("phone", {
                validate: v => { return isValidPhoneNumber(v, 'US') },
                /*onChange: v => { 
                    console.log(v.value);
                    setValue("phone",formatPhone(v.target.value)) 
                },*/

/*onBlur: (v: { currentTarget: { value: string; }; }) => {
    let nextValue = v.currentTarget.value;
    if(nextValue.length>10){
        if(nextValue.substring(0,1) === "1"){
            nextValue = nextValue.substring(1)
        } else if(nextValue.substring(0,2) === "+1"){
            nextValue = nextValue.substring(2)
        } 
        setValue("phone", formatIncompletePhoneNumber(nextValue, 'US')) 
    }
},
/*setValueAs: v => {
    if(v.length>10){
        console.log('nextValue', formatIncompletePhoneNumber(v, 'US') )
        return format(v, 'E.164').substring(2)
    }
    console.log('rawValue', v)
    return v;
},
required: true
})} */