import { Module } from "@nestjs/common";
import { UserService } from "./User.service";
import { UserController } from "./User.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./Entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}