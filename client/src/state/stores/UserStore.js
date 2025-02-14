import EventEmitter from "../../utils/EventEmitter";
import { SERVER } from "../../config/global";

class UserStore {
    constructor() {
        this.data = {};
        this.all = [];
        this.count = 0;
        this.emitter = new EventEmitter();
    }

    async login(email, password) {
        try {
            const response = await fetch(`${SERVER}/auth/login`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (!response.ok) {
                throw response;
            }
            this.data = await response.json();
            this.emitter.emit("LOGIN_SUCCESS");
        } catch (err) {
            console.warn(err);
            this.emitter.emit("LOGIN_ERROR");
        }
    }

    async logout() {
        try {
            console.log(this.data);
            const response = await fetch(`${SERVER}/auth/logout`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: this.data.token,
                }),
            });
            if (!response.ok) {
                throw response;
            }
            this.data = {};
            this.emitter.emit("LOGOUT_SUCCESS");
        } catch (err) {
            console.warn(err);
            this.emitter.emit("LOGOUT_ERROR");
        }
    }

    async register(email, password) {
        try {
            const response = await fetch(`${SERVER}/auth/register`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (!response.ok) {
                throw response;
            }
            this.data = await response.json();
            this.emitter.emit("REGISTER_SUCCESS");
        } catch (err) {
            console.warn(err);
            this.emitter.emit("REGISTER_ERROR");
        }
    }

    async getAll(
        state,
        pageNumber = "",
        pageSize = "",
        filterField = "",
        filterValue = "",
        sortField = "",
        sortOrder = ""
    ) {
        try {
            const response = await fetch(
                `${SERVER}/api/users?pageSize=${pageSize || ""}&pageNumber=${
                    pageNumber === "" ? 0 : pageNumber
                }&filterField=${filterField || ""}&filterValue=${
                    filterValue || ""
                }&sortField=${sortField || ""}&sortOrder=${sortOrder || ""}`,
                {
                    headers: {
                        authorization: this.data.token,
                    },
                }
            );
            if (!response.ok) {
                throw response;
            }

            const content = await response.json();

            this.all = content.data;

            let maxrow = content.count;
            if (pageSize < maxrow) {
                maxrow = pageSize;
            }

            for (let i = 0; i < maxrow; i++) {
                const ratingResponse = await fetch(
                    `${SERVER}/api/users/${content.data[i].id}/feedback`,
                    {
                        headers: {
                            authorization: this.data.token,
                        },
                    }
                );
                if (!ratingResponse.ok) {
                    throw ratingResponse;
                }

                const ratingContent = await ratingResponse.json();
                this.all[i].rating = ratingContent.feedback;
            }

            this.count = content.count;
            this.emitter.emit("GET_USERS_SUCCESS");
        } catch (err) {
            console.warn(err);
            this.emitter.emit("GET_USERS_ERROR");
        }
    }
}

export default UserStore;
