const isLoginAuth = () => {
    const check = localStorage.getItem("tokenAdmin");

    if (check) {
        return check;
    }
    else {
        return null;
    }
}

export default isLoginAuth;