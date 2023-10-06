package io.nextazy.authentication.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.ExceptionHandlingConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor

public class SecurityConfiguration {
	
	@Autowired
	private  JwtAuthenticationFilter jwtAuthFilter;
	@Autowired
	private  AuthenticationProvider authenticationProvider;
	
	@Autowired
	private AuthenticationEntryPoint credentialsException;

	//Depricated Ones !![
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http
//			.csrf().disable()
//			.authorizeHttpRequests()
//			.requestMatchers("/api/v1/auth/register","/api/v1/auth/authenticate")
//			.permitAll().anyRequest().authenticated()
//			.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//			.and().authenticationProvider(authenticationProvider)
//			.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//	]

	 @Bean
	    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	        http
	                .csrf(csrf -> csrf.disable())
	                .authorizeHttpRequests(authorizeHttpRequests ->
	                        authorizeHttpRequests
	                                .requestMatchers("/api/v1/auth/register", "/api/v1/auth/authenticate")
	                                .permitAll()
	                                .anyRequest()
	                                .authenticated()
	                )
	                .exceptionHandling(exceptionHandling ->
	                        exceptionHandling
	                                .authenticationEntryPoint(credentialsException)
	                )
	                .sessionManagement(management ->
	                        management.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	                )
	                .authenticationProvider(authenticationProvider)
	                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

	        return http.build();
	    }
//    
   
       

//        @Bean
//        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//             http
//                .csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(authorizeRequests ->
//                    authorizeRequests
//                        .requestMatchers("/api/v1/auth/register", "/api/v1/auth/authenticate")
//                        .permitAll()
//                        .anyRequest()
//                        .authenticated()
//                )
//                .sessionManagement(sessionManagement ->
//                    sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                )
//                .authenticationProvider(authenticationProvider)
//                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//            
//               return  http.build();
//        }
    
    

}
