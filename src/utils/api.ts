import {getCookie, setCookie} from "./funcs";
import {apiURL} from "./constants";

// Здесь не понял если честно. Почему то на RequestInit ругался что в боди попадает массив. Думаю что это не верное описание типа.
type TOptions = {
    url: string,
    method: string;
    headers: {
        "Content-Type": string
    }
    body?: {
        ingredients?: Array<string>;
        email?: string;
        password?: string;
        token?: string | null;
        name?: string;
    }
}

export const sendData = async (options: TOptions ) => {
    return await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: JSON.stringify(options.body)
    })
}

export const getData = async (url: string) => {
    return await fetch(url)
}

export const refreshToken = () => {
    console.log('I\' am rock');
    return fetch(`${apiURL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};

export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchWithRefresh = async (url: string, options: RequestInit = {}) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
        
        // Здесь где catch мне тоже не понятно почему я могу использовать только тип any или never. Судя по всему тип never возвращает Promise.reject из функции checkResponse
    } catch (err: any) {
        if (err.message === "jwt expired" || err.message === "You should be authorised") {
            const refreshData = await refreshToken();
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("token", refreshData.accessToken.split("Bearer ")[1]);
            (options.headers as { [key: string]: string }).authorization =
                refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const patchUser = async (formData: { email: string; password: string; name: string; }) => {
    const accessToken = getCookie('token')
    if (!accessToken) {
        return { user: null };
    }
    return await fetchWithRefresh(`${apiURL}/auth/user`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'authorization': accessToken
        },
        body: JSON.stringify(formData)
    })
}

export const getUser = async () => {
    const accessToken = getCookie('token')
    if (!accessToken) {
        return { user: null };
    }

    return await fetchWithRefresh(`${apiURL}/auth/user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': accessToken
        }
    })
}
