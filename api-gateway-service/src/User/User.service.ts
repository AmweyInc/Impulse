import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {GetUserResponse, USER_SERVICE_NAME, UserClient} from "./User.pb";
import {ClientGrpc} from "@nestjs/microservices";
import {firstValueFrom, Observable} from "rxjs";

@Injectable()
export class UserService implements OnModuleInit {
    private svc:UserClient;

    @Inject(USER_SERVICE_NAME)
    private readonly grpcAuthClient: ClientGrpc;

    onModuleInit() {
        this.svc = this.grpcAuthClient.getService<UserClient>(
            USER_SERVICE_NAME,
        );
    }

    async getUserInfoViaEmail (data): Promise<any> {
        const currentUser = {
            email: data?.email,
            name: data?.name
        }
        const getUserInfo:Observable<GetUserResponse> = await this.svc.getUser(currentUser);
        const User:GetUserResponse = await firstValueFrom(getUserInfo);

        return User
    }
}
