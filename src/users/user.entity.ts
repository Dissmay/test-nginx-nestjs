import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true })
	public email: string;

	// @Exclude()
	@Column()
	public password?: string;

	@Column({ nullable: true })
	@Exclude()
	public currentHashedRefreshToken?: string;
}

export default User;