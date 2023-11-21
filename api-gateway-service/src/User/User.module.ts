import { Global, Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { grpcAuthOptions, grpcUserOptions } from "../config/grpc.config";
import { UserController } from "./User.controller";
import { UserService } from "./User.service";

@Global()
@Module({
    imports: [ClientsModule.register([grpcAuthOptions,grpcUserOptions])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})

export class UserModule {}