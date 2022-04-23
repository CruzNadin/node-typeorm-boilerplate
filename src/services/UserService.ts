import { Service } from "typedi";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { InterfaceUser } from "../interfaces";
import {
  checkPasswordMatch,
  CustomError,
  ApiResult,
  hashCode,
  compareSyncPass,
  sendTokenToClient,
} from "../helpers";

@Service()
export class UserService {
  public async getAll(): Promise<any> {
    try {
      const user = await AppDataSource.manager.find(User);
      if (user) {
        return new ApiResult(user);
      }
    } catch (error) {
      throw new CustomError(error, 500);
    }
  }

  public async register(bodyData: InterfaceUser): Promise<any> {
    try {
      const isPassMatched = checkPasswordMatch(
        bodyData.password,
        bodyData.re_password
      );
      if (!isPassMatched) {
        return new CustomError("parolalar eşleşmiyor", 400);
      }
      const user = new User();
      if (user) {
        user.name = bodyData.name;
        user.surname = bodyData.surname;
        user.email = bodyData.email;
        user.phone = bodyData.phone;
        user.role = bodyData.role;
        user.active = bodyData.active ?? true;
        user.photo = bodyData.photo;
        user.password = hashCode(bodyData.password);
        return new ApiResult(await AppDataSource.manager.save(user));
      }
    } catch (error) {
      throw new CustomError(error, 500);
    }
  }

  public async login(bodyData: any): Promise<any> {
    try {
      const user = AppDataSource.getRepository(User);
      if (user) {
        const userData = await user.findOne({
          where: {
            email: bodyData.email,
          },
        });
        if (userData) {
          if (!compareSyncPass(bodyData.password, userData.password)) {
            throw new CustomError("Lütfen parolanızı kontrol ediniz", 400);
          } else {
            return new ApiResult({
              ...sendTokenToClient(userData),
            });
          }
        } else {
          return new CustomError("Böyle bir kullanıcı bulunmamaktadır", 401);
        }
      }
      return new CustomError("Böyle bir kullanıcı bulunmamaktadır", 401);
      /* const user = await AppDataSource.findOneBy({
        email: bodyData.email,
      }); */
    } catch (error) {
      return new CustomError("Geçersiz İstek", 500);
    }
  }
}
