import { Body, Get, Post, Res, JsonController } from "routing-controllers";
import { UserService } from "../services/UserService";
import Container from "typedi";
import { Response } from "express";
import { InterfaceUser } from "../interfaces";

@JsonController("/User")
export class UserController {
  private service: UserService;
  constructor() {
    this.service = Container.get(UserService);
  }

  @Get("/GetList")
  public async getAll(@Res() res: Response): Promise<any> {
    const userAll = await this.service.getAll();
    return res.json(userAll);
  }

  @Post("/Register")
  public async register(
    @Body() user: InterfaceUser,
    @Res() res: Response
  ): Promise<Response> {
    const registerUser = await this.service.register(user);
    return res.json(registerUser);
  }

  @Post("/Login")
  public async login(
    @Body() user: InterfaceUser,
    @Res() res: Response
  ): Promise<Response> {
    const loginUser = await this.service.login(user);
    return res.json(loginUser);
  }
}
