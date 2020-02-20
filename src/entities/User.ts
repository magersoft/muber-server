import bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Chat from './Chat';
import Message from './Message';
import Ride from './Ride';
import Place from './Place';

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: 'boolean', default: false })
  verifiedEmail: boolean;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'integer', nullable: true })
  age: number;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'text', nullable: true })
  phoneNumber: string;

  @Column({ type: 'boolean', default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: 'text' })
  profilePhoto: string;

  @Column({ type: 'boolean', default: false })
  isDriving: boolean;

  @Column({ type: 'boolean', default: false })
  isRiding: boolean;

  @Column({ type: 'boolean', default: false })
  isTaken: boolean;

  @Column({ type: 'double precision', default: 0 })
  lastLng: number;

  @Column({ type: 'double precision', default: 0 })
  lastLat: number;

  @Column({ type: 'double precision', default: 0 })
  lastOrientation: number;

  @Column({ type: 'text', nullable: true })
  fbId: string;

  @Column({ type: 'boolean', default: false })
  darkTheme: boolean;

  @OneToMany(type => Chat, chat => chat.passenger)
  chatsAsPassenger: Chat[];

  @OneToMany(type => Chat, chat => chat.driver)
  chatsAsDriver: Chat[];

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  @OneToMany(type => Ride, ride => ride.passenger)
  ridesAsPassenger: Ride[];

  @OneToMany(type => Ride, ride => ride.driver)
  ridesAsDriver: Ride[];

  @OneToMany(type => Place, place => place.user)
  places: Place[];

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public async comparePassword(password: string): Promise<boolean> {
    console.log(await bcrypt.compare(password, this.password));
    return await bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      this.password = await this.hashPassword(this.password);
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

}

export default User;
