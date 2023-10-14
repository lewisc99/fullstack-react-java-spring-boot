package com.luv2code.springbootlibrary.domain.entities;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name= "tb_user")
public class User  implements UserDetails {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(columnDefinition = "uuid",nullable = false)
    @ColumnDefault("random_uuid()")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;
    private String email;
    private String password;
    private boolean active;

    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(
                    name = "user_id"

            ),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id"

            )
    )
    @ManyToMany(fetch=FetchType.EAGER,
            cascade = {CascadeType.PERSIST,CascadeType.MERGE,
                    CascadeType.DETACH,CascadeType.REFRESH})

    private List<Role> roles;


    public User(UUID id, String username, String password, boolean active) {

        this.id = id;
        this.password = password;
        this.active = active;
    }

    public User(){}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return checkGrantAuthorities();
    }
    private List<GrantedAuthority> checkGrantAuthorities() {
        List<GrantedAuthority> authoritiesRole = new ArrayList<GrantedAuthority>();

        if(email !=null && getRoles()!=null && getRoles().isEmpty()==false)

            for(Role roleUser : getRoles()){
                authoritiesRole.add(new SimpleGrantedAuthority(roleUser.getName()));
            }
        return authoritiesRole;
    }

    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override
    public boolean isEnabled() {

        return active;
    }
}