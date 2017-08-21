CREATE TABLE IF NOT EXISTS `Customers` (
  `id`             INT          NOT NULL AUTO_INCREMENT,
  `fName`          VARCHAR(255),
  `lName`          VARCHAR(255) NOT NULL,
  `email`          VARCHAR(255) NOT NULL,
  `site`           VARCHAR(255) NOT NULL,
  `password_hash`  VARCHAR(32)  NOT NULL,
  `hash`           VARCHAR(32)  NOT NULL,
  `permission`     INT          NOT NULL,
  `permission_ext` DATETIME     NOT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;


INSERT INTO `customers`
(`fName`, `lName`, `email`, `site`, `password_hash`, `hash`, `permission`, `permission_ext`) VALUES
  ('Kirill',
   'Titenko',
   'kirill.titenko@gmail.com',
   'http://localhost/wordpress',
   '1BC29B36F623BA82AAF6724FD3B16718',
   'D41D8CD98F00B204E9800998ECF8427E',
   5,
   STR_TO_DATE('01,5,2019', '%d,%m,%Y'));