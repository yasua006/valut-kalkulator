document.addEventListener('DOMContentLoaded', () => {
    const convert_curr = async (base, target, amount) => {
        const EXCHANGE_RATE_API_KEY = "c3bebc3cf92257a19192d324";
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/pair/${base}/${target}/${amount}`);
        if (!res.ok) {
            throw new Error("Not ok!");
        }
        const data = await res.json();
        if (!data) {
            throw new Error("No data!");
        }
        return data.conversion_result;
    };
    const { createApp, ref, onMounted } = Vue;
    const app = createApp({
        setup() {
            const base = ref("USD (Amerikanske Dollar) 🇺🇸");
            const target = ref("EUR (Euro) 🇪🇺");
            const amount = ref(1000);
            const result = ref(null);
            const convert = async () => {
                try {
                    result.value = await convert_curr(base.value, target.value, amount.value);
                }
                catch (err) {
                    throw new Error(`Can't convert! ${err}`);
                }
            };
            onMounted(convert);
            return {
                base,
                target,
                amount,
                result,
                convert
            };
        }
    });
    app.mount('#app');
});
