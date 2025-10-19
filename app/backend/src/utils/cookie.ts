const getCookie = (cookies: string, cookieKey: string): string | null => {
    const cookiesSplit = cookies.split(";");
    const valuesSplit = cookiesSplit.map((value) => value.split("="));

    for (let i = 0; i < valuesSplit.length; i++) {
        const act_val = valuesSplit[i];
        if (act_val?.length === 2 && act_val[0] === cookieKey) {
            const res = act_val[1] ? act_val[1] : null;
            return res;
        }
    }

    return null;
};

export default getCookie;