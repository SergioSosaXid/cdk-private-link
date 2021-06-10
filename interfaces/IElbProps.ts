export interface IElbProps {
    vpc: any;
    arn?: string;
    privateElb: boolean;
    isElbExisting: boolean;
}