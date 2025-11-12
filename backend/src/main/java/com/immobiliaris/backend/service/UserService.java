package com.immobiliaris.backend.service;
import java.util.List;

import com.immobiliaris.backend.model.Users;

public interface UserService {
    Users createUser(Users user);
    Users save(Users user);
    List<Users> getAllUsers();
    Users getUserById(Long id);
    Users updateUser(Long id, Users user);
    Users updateRoleUsers(Long id, Users user);
    Users deleteUser(Long id);
}
