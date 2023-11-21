import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./Entities/user.entity";
import { RegisterDto } from "./dto/User.dto";

export class UserService {
    @InjectRepository(User)
    private readonly repository: Repository<User>;

    public async existUser(data): Promise<boolean> {
        const userExist: User = await this.repository.findOne({ where: { email: data.email } });
        return !!userExist;
    }

    public async getUser(data): Promise<User | null> {
        const getUser: User = await this.repository.findOne({ where: { email: data.email } });
        return getUser;
    }

    public async refresh(data): Promise<User | null> {
        const updateUser: User = await this.repository.findOne({ where: { id: data.id } });
        updateUser.lastLoginAt = new Date();
        await this.repository.save(updateUser);
        return updateUser;
    }

    public async createUser(data): Promise<boolean> {
        const { name, email, password }: RegisterDto = data;

        const userCreate: User = new User();
        userCreate.userName = name;
        userCreate.email = email;
        userCreate.password = password;

        const userCreateResolve = await this.repository.save(userCreate);

        return !!userCreateResolve;
    }
}