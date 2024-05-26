/**
 * @class UsuarioRepository
 * @description Repositório de usuários
 */

import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '../../domain/entities/usuario.entity';

@Injectable()
@Dependencies(getRepositoryToken(Usuario))
export class UsuarioRepositoryOrm {
  constructor(usuariosRepository) {
    this.usuariosRepository = usuariosRepository;
  }

  /**
   * @method getTodosUsuarios
   * @description Retorna todos os usuários
   * @returns {Promise<Usuario[]>}
   */
  async getTodosUsuarios() {
    return this.usuariosRepository.find();
  }

  /**
   * @method createUsuario
   * @description Cria um novo usuário
   * @param {Usuario} usuario
   * @returns {Promise<Usuario>}
   */
  async createUsuario(usuario) {
    return this.usuariosRepository.save(usuario);
  }

}
