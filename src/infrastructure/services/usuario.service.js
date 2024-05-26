import { Dependencies, Injectable } from '@nestjs/common';
import { UsuarioRepositoryOrm } from '../repositories/usuario.repository';


@Injectable()
@Dependencies(UsuarioRepositoryOrm)
export class UsuarioService {
  constructor(usuarioRepositoryOrm) {
    this.usuarioRepositorio = usuarioRepositoryOrm;
  }

  /**
   * @method getTodosUsuarios
   * @returns {Promise<Usuario[]>}
   */
  async getTodosUsuarios() {
    return await this.usuarioRepositorio.getTodosUsuarios();
  }

  /**
   * @method criarUsuario
   * @description Cria um novo usuário
   * @param {Usuario} usuario
   * @returns {Promise<Usuario>}
   */
  async createUsuario(usuario) {
    return await this.usuarioRepositorio.createUsuario(usuario);
  }


}

module.exports = { UsuarioService };
