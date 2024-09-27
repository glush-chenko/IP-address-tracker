interface GetAddressParams {
    ip: string;
    validateIp: (ip: string) => boolean;
    setInfo: (data: any) => void;
}

export const getAddress = async ({ ip, validateIp, setInfo }: GetAddressParams) => {
    if (ip && validateIp(ip)) {
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_8YiD7zNXtTMkCTW4hoM3StcQpKoBd&ipAddress=${ip}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        await setInfo(result);
    } else {
        alert('IP address input is empty');
        return null;
    }
}