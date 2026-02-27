import { convert_curr } from './modules/convert-curr.js';
const storage_key = "Previous conversion result";
const { createApp, ref } = Vue;
const app = createApp({
    setup() {
        const base = ref("");
        const target = ref("");
        const amount = ref(1000);
        const result = ref(null);
        const previous_result = ref("Førrige resultat: " + localStorage.getItem(storage_key));
        const convert = async () => {
            try {
                result.value = "Resultat: " + await convert_curr(base.value, target.value, amount.value);
                // console.log(base);
                // console.log(base.value);
                // console.log(target);
                // console.log(target.value);
                localStorage.removeItem(storage_key);
                localStorage.setItem(storage_key, result.value.replaceAll("Resultat: ", ""));
            }
            catch (err) {
                throw new Error(`Can't convert! ${err}`);
            }
        };
        return {
            base,
            target,
            amount,
            result,
            previous_result,
            convert
        };
    }
});
app.mount('#app');
