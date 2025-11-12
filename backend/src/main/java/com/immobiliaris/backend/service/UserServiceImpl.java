
        package com.immobiliaris.backend.service;

        import com.immobiliaris.backend.model.Users;
        import com.immobiliaris.backend.repo.UsersRepository;

        import java.util.List;
        import java.util.Optional;

        import org.springframework.stereotype.Service;
        import org.springframework.transaction.annotation.Transactional;

        /**
         * Implementazione del servizio utenti senza hashing password (solo per test/dev su richiesta).
         * ATTENZIONE: salvare password in chiaro è insicuro e deve essere usato solo in ambienti di sviluppo controllati.
         */
        @Service
        @Transactional
        public class UserServiceImpl implements UserService {

            private final UsersRepository userRepo;

            public UserServiceImpl(UsersRepository userRepo) {
                this.userRepo = userRepo;
            }

            @Override
            public Users createUser(Users user) {
                // controlla esistenza email
                Optional<Users> byEmail = userRepo.findByEmail(user.getEmail());
                if (byEmail.isPresent()) {
                    throw new IllegalArgumentException("Email già in uso");
                }
                // SALVA password in chiaro (richiesto)
                return userRepo.save(user);
            }

            @Override
            public Users save(Users user) {
                // salva o aggiorna senza modificare la password
                return userRepo.save(user);
            }

            @Override
            public List<Users> getAllUsers() {
                return userRepo.findAll();
            }

            @Override
            public Users getUserById(Long id) {
                return userRepo.findById(id).orElse(null);
            }

            @Override
            public Users updateUser(Long id, Users user) {
                Users existing = userRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Utente non trovato"));
                // aggiornamento campi base (escludendo id)
                if (user.getNome() != null) existing.setNome(user.getNome());
                if (user.getCognome() != null) existing.setCognome(user.getCognome());
                if (user.getEmail() != null) existing.setEmail(user.getEmail());
                if (user.getTelefono() != null) existing.setTelefono(user.getTelefono());
                // Se viene fornita una password la salviamo così com'è (chiaro)
                if (user.getPassword() != null) {
                    existing.setPassword(user.getPassword());
                }
                return userRepo.save(existing);
            }

            @Override
            public Users updateRoleUsers(Long id, Users user) {
                Users existing = userRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Utente non trovato"));
                if (user.getRuolo() != null) existing.setRuolo(user.getRuolo());
                return userRepo.save(existing);
            }

            @Override
            public Users deleteUser(Long id) {
                Users existing = userRepo.findById(id).orElse(null);
                if (existing != null) {
                    userRepo.deleteById(id);
                }
                return existing;
            }

        }