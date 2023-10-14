package com.luv2code.springbootlibrary.domain.entities;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="tb_role")
public class Role {

    @Id
    @Column(columnDefinition = "uuid",nullable = false)
    @ColumnDefault("random_uuid()")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    private String name;

    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(

                    name = "role_id"
            ),
            inverseJoinColumns = @JoinColumn(

                    name = "user_id"

            )
    )
    @ManyToMany(fetch= FetchType.EAGER,
            cascade = {CascadeType.PERSIST,CascadeType.MERGE,
                    CascadeType.DETACH,CascadeType.REFRESH})

    private List<User> users;


    public Role() {}

    public Role(UUID id, String name) {

        this.id = id;
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}