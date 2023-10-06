package io.nextazy.authentication.security.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.nextazy.authentication.security.config.JwtService;
import io.nextazy.authentication.security.user.Role;
import io.nextazy.authentication.security.user.User;
import io.nextazy.authentication.security.user.UserRepository;
//import lombok.RequiredArgsConstructor;

//@Service
//@RequiredArgsConstructor
//public class AuthenticationService {
//	
//	@Autowired
//	private UserRepository repository;
//	@Autowired
//	private PasswordEncoder passwordEncoder;
//	@Autowired
//	private JwtService jwtService;
//	@Autowired
//	private AuthenticationManager authenticationManager;
//
//	 public AuthenticationResponse register(RegisterRequest request) {
//	        User user = new User();
//	        user.setFirstname(request.getFirstname());
//	        user.setLastname(request.getLastname());
//	        user.setEmail(request.getEmail());
//	        user.setPassword(passwordEncoder.encode(request.getPassword()));
//	        user.setRole(Role.USER);
//	        
//	        User savedUser = repository.save(user);
//	        String jwtToken = jwtService.generateToken(user);
//	        String refreshToken = jwtService.generateRefreshToken(user);
//	        saveUserToken(savedUser, jwtToken);
//	        
//	        AuthenticationResponse response = new AuthenticationResponse();
//	        response.setToken(jwtToken);
//	        response.setRefreshToken(refreshToken);
//	        
//	        return response;
//	    }
//
//		
//	 private void saveUserToken(User savedUser, String jwtToken) {
//	        System.out.println("User token saved for user ID: " + savedUser.getUsername() + ", Token: " + jwtToken);
//	    }
//
//
//	public AuthenticationResponse authenticate(AuthenticationRequest request) {
//	    Authentication authentication = authenticationManager.authenticate(
//	        new UsernamePasswordAuthenticationToken(
//	            request.getEmail(),
//	            request.getPassword()
//	        )
//	    );
//
//	    SecurityContextHolder.getContext().setAuthentication(authentication);
//
//	    User user = repository.findByEmail(request.getEmail())
//	            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
//	    String jwtToken = jwtService.generateToken(user);
//	    String refreshToken = jwtService.generateRefreshToken(user);
//
//	    revokeAllUserTokens(user);
//	    saveUserToken(user, jwtToken);
//
//	    AuthenticationResponse response = new AuthenticationResponse();
//	    response.setToken(jwtToken);
//	    response.setRefreshToken(refreshToken);
//
//	    return response;
//	
//	}
//
//	 private void revokeAllUserTokens(User user) {
//	        System.out.println("Revoking all tokens for user ID: " + user.getUsername());
//	    }
//}


@Service
public class AuthenticationService {
	
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        User user = new User();
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        repository.save(user);

        AuthenticationResponse response = new AuthenticationResponse("User registered successfully.");

        return response;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = repository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            String jwtToken = jwtService.generateToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            revokeAllUserTokens(user);
            saveUserToken(user, jwtToken);

            AuthenticationResponse response = new AuthenticationResponse(jwtToken, refreshToken);

            return response;
        } catch (AuthenticationException e) {
            // Handle invalid credentials using the custom entry point
            handleInvalidCredentials();

            throw new BadCredentialsException("Invalid username or password");
        }
    }

    private void saveUserToken(User user, String jwtToken) {
        System.out.println("User token saved for user ID: " + user.getUsername() + ", Token: " + jwtToken);
    }

    private void revokeAllUserTokens(User user) {
        System.out.println("Revoking all tokens for user ID: " + user.getUsername());
    }
    
    private void handleInvalidCredentials() {
        System.out.println("Handling invalid credentials");
    }
}




