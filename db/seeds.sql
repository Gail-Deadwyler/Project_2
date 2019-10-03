USE fitness_db;

INSERT INTO users 
    (
        firstName,
        lastName,
        username,
        email,
        password,
        createdAt,
        updatedAt
    )
VALUES 
    (
        "Tyler",
        "Falcoff",
        "tfalcoff",
        "tfalcoff@gmail.com",
        "12Test34",
        NOW(),
        NOW()
    ),
    (
        "Kevin",
        "Bacon",
        "KevBacon",
        "KevBacon@bacon.com",
        "12Test34",
        NOW(),
        NOW()
    )
;

INSERT INTO activities
    (
        title,
        type,
        units,
        UserId,
        createdAt,
        updatedAt
    )  
VALUES 
    (
        "Walk to work",
        "Steps",
        3000,
        1,
        NOW(),
        NOW()
    ),
    (
        "After work gym",
        "Hours",
        2,
        1,
        NOW(),
        NOW()
    ),
    (
        "Getting groceries",
        "Steps",
        2000,
        1,
        NOW(),
        NOW()
    ),
    (
        "Going to party",
        "Steps",
        5000,
        2,
        NOW(),
        NOW()
    )
;