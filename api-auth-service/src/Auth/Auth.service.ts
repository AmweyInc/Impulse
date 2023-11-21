import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from "@nestjs/microservices";
import {
  CreateUserResponse,
  ExistUserResponse, GetUserResponse, UpdateUserResponse,
  USER_SERVICE_NAME,
  UserClient
} from "../User/User.pb";
import {RegisterDto, UserAuthResponse} from './dto/auth.dto';
import { firstValueFrom, Observable } from "rxjs";
import { AuthHelper } from "./Auth.helper";

export class AuthService implements OnModuleInit {
  private svc: UserClient;

  @Inject(USER_SERVICE_NAME)
  private readonly grpcAuthClient: ClientGrpc;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public onModuleInit(): void {
    this.svc = this.grpcAuthClient.getService<UserClient>(
        USER_SERVICE_NAME,
    );
  }

  async signUp(data): Promise<boolean> {
    try {
      const newUser = {
        email: data.email,
        name: data.name
      }

      const getUserInfo:Observable<ExistUserResponse> = await this.svc.existUser(newUser);
      const User:ExistUserResponse = await firstValueFrom(getUserInfo);

      if (User.exist) {
        return false;
      }

      const userObject = new RegisterDto()
      userObject.email = data.email;
      userObject.password = this.helper.encodePassword(data.password);
      userObject.name = data.name

      const createUser = await this.svc.createUser(userObject)
      const createNewUser:CreateUserResponse = await firstValueFrom(createUser);

      return createNewUser.create;
    } catch (e) {
      return false;
    }
  }

  async signIn(data): Promise<UserAuthResponse> {
    try {
      const newUser = {
        email: data?.email,
        name: data?.name
      }

      const getUserInfo:Observable<GetUserResponse> = await this.svc.getUser(newUser);
      const User:GetUserResponse = await firstValueFrom(getUserInfo);

      if (!User) {
        return { token: '' }
      }

      const isPasswordValid: boolean = this.helper.isPasswordValid(data.password,User.password);

      if (!isPasswordValid) {
        return { token: '' }
      }

      const updateUserObject: Observable<UpdateUserResponse> = await this.svc.refresh({ id:User.id })
      const updateUser: UpdateUserResponse = await firstValueFrom(updateUserObject);

      return { token: this.helper.generateToken(User) };
    } catch (e) {
      return { token: '' };
    }
  }

  async refresh(data): Promise<UserAuthResponse> {
    try {
      const token = data.token.split(' ')[1];
      const decodeToken = await this.helper.decode(token);

      const updateUserObject: Observable<UpdateUserResponse> = await this.svc.refresh({ id:decodeToken.id })
      const updateUser: UpdateUserResponse = await firstValueFrom(updateUserObject);

      const newUser = {
        email: decodeToken?.email,
        name: data?.name
      }

      const getUserInfo:Observable<GetUserResponse> = await this.svc.getUser(newUser);
      const User:GetUserResponse = await firstValueFrom(getUserInfo);

      return { token: this.helper.generateToken(User) };
    } catch (e) {
      return { token: '' };
    }
  }
}