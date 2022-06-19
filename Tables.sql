BEGIN;

CREATE TABLE IF NOT EXISTS public.vehicle
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    license_plate character varying(10) NOT NULL,
    vehicle_name character varying(20) NOT NULL,
    vehicle_type_id smallint NOT NULL DEFAULT 1,
    customer_id bigint NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_event_type
(
    id SMALLSERIAL NOT NULL PRIMARY KEY,
    type character varying(100) NOT NULL UNIQUE,
    description character varying(300),
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_floor
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    floor_name character varying(100),
    floor_number smallint NOT NULL DEFAULT 1 UNIQUE,
    is_covered boolean NOT NULL DEFAULT true,
    parking_lot_id bigint NOT NULL,
    date_created timestamp without time zone NOT NULL,
    date_modified timestamp without time zone,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_lot
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    lot_name character varying(120) COLLATE pg_catalog."default" NOT NULL UNIQUE,
    lot_description character varying(300),
    lot_geolocation point,
    mobile_access boolean NOT NULL DEFAULT false,
    business_name character varying(300) DEFAULT '',
    is_covered boolean NOT NULL DEFAULT false,
    payment_method_id smallint NOT NULL,
    lot_currency_id integer NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_spot
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    parking_floor_id bigint NOT NULL,
    spot_name character varying(30) DEFAULT '',
    spot_number integer NOT NULL UNIQUE,
    spot_type_id smallint NOT NULL,
    is_covered boolean NOT NULL DEFAULT false,
    is_taken boolean NOT NULL DEFAULT false,
    is_reserved boolean NOT NULL DEFAULT false,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_spot_type
(
    id SMALLSERIAL NOT NULL PRIMARY KEY,
    type character varying(20) NOT NULL UNIQUE,
    description character varying(100),
    active boolean NOT NULL DEFAULT true
);

-- CREATE TABLE IF NOT EXISTS public.parking_lot_type
-- (
--     id SMALLSERIAL NOT NULL PRIMARY KEY,
--     type character varying(30) NOT NULL UNIQUE,
--     description character varying(100),
--     active boolean NOT NULL DEFAULT true
-- );

CREATE TABLE IF NOT EXISTS public.vehicle_type
(
    id SMALLSERIAL NOT NULL PRIMARY KEY,
    name character varying(30) NOT NULL UNIQUE,
    description character varying(100),
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.user_activity_log
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    table_name character varying(30),
    table_column character varying(30),
    prev_value character varying(500),
    new_value character varying(500),
    parking_lot_id bigint NOT NULL,
    activity_date timestamp without time zone NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_system_log
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    event_type_id integer NOT NULL,
    parking_lot_id bigint NOT NULL,
    event_date timestamp without time zone NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.customer
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    telephone character varying(15) NOT NULL,
    vehicle_id bigint,
    date_created timestamp without time zone NOT NULL,
    date_modified timestamp without time zone,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_pricing
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    pricing_type_id integer,
    pricing_plan_id bigint NOT NULL,
    duration timestamp without time zone NOT NULL,
    rate double precision NOT NULL,
    day_of_week smallint NOT NULL,
    time_start time without time zone NOT NULL,
    date_created timestamp without time zone NOT NULL,
    date_modified timestamp without time zone,
    active boolean NOT NULL DEFAULT true
);

-- CREATE TABLE IF NOT EXISTS public.parking_spot_reservation
-- (
--     id BIGSERIAL NOT NULL PRIMARY KEY,
--     vehicle_id bigint NOT NULL,
--     customer_id bigint NOT NULL,
--     parking_spot_id bigint NOT NULL,
--     reservation_date timestamp without time zone NOT NULL,
--     date_created timestamp without time zone NOT NULL,
--     date_modified timestamp without time zone,
--     active boolean NOT NULL DEFAULT true
-- );

CREATE TABLE IF NOT EXISTS public.payment
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    amount double precision NOT NULL,
    payment_method_id smallint NOT NULL,
    parking_log_id bigint NOT NULL,
    parking_lot_id bigint NOT NULL,
    date_created timestamp without time zone NOT NULL,
    date_modified timestamp without time zone,
    active boolean NOT NULL DEFAULT true
);

-- CREATE TABLE IF NOT EXISTS public.payment_type
-- (
--     id bigint NOT NULL PRIMARY KEY DEFAULT nextval('payment_type_id_seq'::regclass),
--     expiry_year smallint NOT NULL,
--     expiry_month smallint NOT NULL,
--     card_type character varying(20) NOT NULL,
--     card_number character varying(20) NOT NULL,
--     active boolean NOT NULL DEFAULT true,
-- );

-- CREATE TABLE IF NOT EXISTS public.parking_pricing_plan_type
-- (
--     id SMALLSERIAL NOT NULL PRIMARY KEY,
--     type character varying(100) NOT NULL UNIQUE,
--     description character varying(300),
--     active boolean NOT NULL DEFAULT true
-- );

CREATE TABLE IF NOT EXISTS public.parking_log
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    in_datetime timestamp without time zone NOT NULL,
    out_datetime timestamp without time zone,
    parking_lot_id bigint NOT NULL,
    license_plate character varying(10) NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_hours
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    day_of_week smallint NOT NULL,
    open_time time without time zone NOT NULL,
    close_time time without time zone NOT NULL,
    parking_hours_plan_id bigint NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_hours_plan
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    plan_name character varying(300) NOT NULL UNIQUE,
    parking_lot_id bigint NOT NULL,
    active_from_date timestamp without time zone NOT NULL,
    active_to_date timestamp without time zone,
    date_created timestamp without time zone NOT NULL,
    date_modified timestamp without time zone,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_pricing_plan
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    plan_name character varying(300) NOT NULL UNIQUE,
    active_from_date timestamp without time zone NOT NULL,
    active_to_date timestamp without time zone,
    parking_lot_id bigint NOT NULL,
    date_created timestamp without time zone NOT NULL,
    date_modified timestamp without time zone,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_payment_method
(
    id SMALLSERIAL NOT NULL PRIMARY KEY,
    method_name character varying(300) NOT NULL UNIQUE,
    method_description character varying(300),
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_lot_customer
(
    parking_lot_id BIGSERIAL NOT NULL PRIMARY KEY,
    customer_id bigint NOT NULL DEFAULT nextval('customer_id_seq'::regclass),
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.parking_currency
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name character varying(300) NOT NULL UNIQUE,
    description character varying(300),
    active boolean NOT NULL DEFAULT true
);


ALTER TABLE IF EXISTS public.vehicle
    ADD FOREIGN KEY (vehicle_type_id)
    REFERENCES public.vehicle_type (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.vehicle
    ADD FOREIGN KEY (customer_id)
    REFERENCES public.customer (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_floor
    ADD FOREIGN KEY (parking_lot_id)
    REFERENCES public.parking_lot (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_lot
    ADD FOREIGN KEY (lot_currency_id)
    REFERENCES public.parking_currency (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_lot
    ADD FOREIGN KEY (payment_method_id)
    REFERENCES public.parking_payment_method (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_spot
    ADD CONSTRAINT "parking_spot_type_id_FK" FOREIGN KEY (spot_type_id)
    REFERENCES public.parking_spot_type (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_spot
    ADD FOREIGN KEY (parking_floor_id)
    REFERENCES public.parking_floor (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_system_log
    ADD FOREIGN KEY (event_type_id)
    REFERENCES public.parking_event_type (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_system_log
    ADD FOREIGN KEY (parking_lot_id)
    REFERENCES public.parking_lot (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.user_activity_log
    ADD FOREIGN KEY (parking_lot_id)
    REFERENCES public.parking_lot (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.parking_pricing
    ADD FOREIGN KEY (pricing_plan_id)
    REFERENCES public.parking_pricing_plan (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.payment
    ADD FOREIGN KEY (payment_method_id)
    REFERENCES public.parking_payment_method (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.payment
    ADD FOREIGN KEY (payment_method_id)
    REFERENCES public.parking_payment_method (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.payment
    ADD FOREIGN KEY (parking_log_id)
    REFERENCES public.parking_log (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.payment
    ADD FOREIGN KEY (parking_lot_id)
    REFERENCES public.parking_lot (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_log
    ADD FOREIGN KEY (parking_lot_id)
    REFERENCES public.parking_lot (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_hours
    ADD FOREIGN KEY (parking_hours_plan_id)
    REFERENCES public.parking_hours_plan (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_hours_plan
    ADD FOREIGN KEY (parking_lot_id)
    REFERENCES public.parking_lot (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_pricing_plan
    ADD FOREIGN KEY (parking_lot_id)
    REFERENCES public.parking_lot (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_lot_customer
    ADD FOREIGN KEY (parking_lot_id)
    REFERENCES public.parking_lot (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.parking_lot_customer
    ADD FOREIGN KEY (customer_id)
    REFERENCES public.customer (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;