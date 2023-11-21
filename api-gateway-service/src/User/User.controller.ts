import { Body, Controller, Post, UseFilters, UseGuards } from "@nestjs/common";
import { RpcExceptionFilter } from "../utils/GRPCExcreption.filter";
import { UserService } from "./User.service";
import { GrpcAuthGuard } from "../Auth/Auth.guard";

@Controller('user')
@UseFilters(RpcExceptionFilter)
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/info')
    @UseGuards(GrpcAuthGuard)
    async getUser(@Body() data:any): Promise<string> {
        return this.userService.getUserInfoViaEmail(data)
    }
}