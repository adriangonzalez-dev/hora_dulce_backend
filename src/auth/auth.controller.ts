import {
  Controller,
  Get,
  Post,
  Body,
  /*   Patch, */
  Param,
  /*   Delete, */
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
/* import { UpdateAuthDto } from './dto/update-auth.dto'; */
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from './decorators/get-user.decorator';
import { Auth } from './entities/auth.entity';
import { ValidRole } from './decorators/Valid-role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get('private')
  @UseGuards(AuthGuard())
  private(@getUser() @ValidRole('user_role') user: Auth) {
    return {
      user,
      message: 'This is a private message!',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Get('relogin/:token')
  reLogin(@Param('token') token: string) {
    return this.authService.relogin(token);
  }
}
