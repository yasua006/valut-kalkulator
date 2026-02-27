import { convert_curr } from './modules/convert-curr';

const storage_key: string = "Previous conversion result";

const {createApp, ref} = Vue;

const app = createApp({
    setup() {
        const base = ref("");
        const target = ref("");
        const amount = ref(1000);
        const result = ref(null);
        const previous_result = ref(
            "Førrige resultat: " + localStorage.getItem(storage_key));
        const with_decimals_str = ref("ja");

        const convert = async(): Promise<void> => {
            try {
                result.value = "Resultat: " + await convert_curr(
                    base.value, target.value, amount.value,
                    with_decimals_str.value,
                ) + target.value;
                
                // console.log(base);
                // console.log(base.value);
                // console.log(target);
                // console.log(target.value);

                localStorage.removeItem(storage_key);
                localStorage.setItem(storage_key, result.value.replaceAll("Resultat: ", ""));
            } catch (err) {
                throw new Error(`Can't convert! ${err}`);
            }
        };

        return {
            base,
            target,
            amount,
            result,
            previous_result,
            with_decimals_str,
            convert
        };
    }
})

app.mount('#app');