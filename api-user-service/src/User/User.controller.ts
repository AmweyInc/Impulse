import {Controller, UseFilters} from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { UserService } from "./User.service";
import { USER_SERVICE_NAME } from "./User.pb";
import { Metadata, ServerUnaryCall }  from "@grpc/grpc-js";
import { UserCreateDto, UserExistDto, UserGetDto } from "./dto/User.dto";
import { RpcExceptionFilter } from "../utils/exceptions";

@Controller()
export class UserController {
    constructor(private UserService:  UserService) {
    }

    @GrpcMethod(USER_SERVICE_NAME, 'existUser')
    @UseFilters(RpcExceptionFilter.for('UserController::existUser'))
    async existUser(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<UserExistDto> {
        const existUser = await this.UserService.existUser(data);
        return { exist: existUser };
    }

    @GrpcMethod(USER_SERVICE_NAME, 'createUser')
    @UseFilters(RpcExceptionFilter.for('UserController::createUser'))
    async createUser(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<UserCreateDto> {
        const createUser = await this.UserService.createUser(data);
        return { create: createUser };
    }

    @GrpcMethod(USER_SERVICE_NAME, 'getUser')
    @UseFilters(RpcExceptionFilter.for('UserController::getUser'))
    async getUser(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<UserGetDto | null> {
        const getUser = await this.UserService.getUser(data);
        return { id:getUser.id, email: getUser.email, password: getUser.password };
    }

    @GrpcMethod(USER_SERVICE_NAME, 'refresh')
    @UseFilters(RpcExceptionFilter.for('UserController::refresh'))
    async refresh(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<UserGetDto | null> {
        const getUser = await this.UserService.refresh(data);
        return { id:getUser.id, email: getUser.email, password: getUser.password };
    }
}