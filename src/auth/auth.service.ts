import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model } from 'mongoose';
import { Auth } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compareHash, generateHash } from './helpers/bcryptGenerator';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      let user = await this.authModel.findOne({ email: createAuthDto.email });
      if (user) {
        throw new BadRequestException('El usuario ya existe!');
      }
      createAuthDto.email = createAuthDto.email.toLowerCase();
      createAuthDto.username = createAuthDto.username.toLowerCase();

      user = new this.authModel(createAuthDto);
      user.password = generateHash(user.password);

      await user.save();

      return {
        name: user.username,
        email: user.email,
        role: user.role,
        _id: user._id,
        avatar: user.avatar,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Contacte con el administrador!');
    }
  }

  findAll() {
    return `This endpoint is not implemented yet!`;
  }

  async findOne(id: string) {
    try {
      const user = await this.authModel.findById(id);
      if (!user) {
        throw new NotFoundException('No existe el usuario!');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Hable con el administrador!');
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.authModel.findOne({ email: loginAuthDto.email });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas!');
    }

    if (!compareHash(loginAuthDto.password, user.password)) {
      throw new UnauthorizedException('Credenciales inválidas!');
    }

    const token = this.getJwtToken({ id: user._id });

    return {
      user: {
        name: user.username,
        email: user.email,
        role: user.role,
        _id: user._id,
        avatar: user.avatar,
      },
      token,
      expiresIn: 3600,
      message: 'Login correcto!',
    };
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return 'this endpoint is not implemented yet!';
  }

  remove(id: number) {
    return 'this endpoint is not implemented yet!';
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
