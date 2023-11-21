import { Injectable, CanActivate, ExecutionContext, Inject, OnModuleInit } from '@nestjs/common';
import { AUTHORIZATION_SERVICE_NAME, AuthorizationClient, AuthorizationToken } from "./Auth.pb";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GrpcAuthGuard implements CanActivate,OnModuleInit {
    private svc: AuthorizationClient;

    @Inject(AUTHORIZATION_SERVICE_NAME)
    private readonly grpcAuthClient: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.grpcAuthClient.getService<AuthorizationClient>(
            AUTHORIZATION_SERVICE_NAME,
        );
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {

            const isAuthenticatedObject= await this.svc.refresh({ token: request.headers.authorization });
            const isAuthenticated:AuthorizationToken = await firstValueFrom(isAuthenticatedObject);

            return !!isAuthenticated.token.length;
        } catch (error) {
            return false;
        }
    }
}
