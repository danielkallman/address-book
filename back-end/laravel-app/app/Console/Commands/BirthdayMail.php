<?php

namespace App\Console\Commands;

use App\AddressBook;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class BirthdayMail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'birthdaymail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a email to all contacts in address book who has birthday today';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $sentTo = [];
        $from = 'daka.development@gmail.com';
        $subject = 'Grattis på födelsedagen';
        $message = 'Grattis på födelsedagen';

        $addressBooks = AddressBook::all();
        foreach ($addressBooks as $addressBook) {
            if ($this->shouldBirthdayMailBeSent($addressBook->socialId)) {
                Mail::raw("{$message}: {$addressBook->name}", function ($mail) use ($addressBook, $from, $subject) {
                    $mail->from($from);
                    $mail->to($addressBook->email)
                        ->subject($subject);
                });
                $sentTo [] = $addressBook;
            }
        }

        if (!empty($sentTo)) {
            $receivers = '';
            foreach ($sentTo as $addressBook) {
                $receivers .= "{$addressBook->name} ({$addressBook->socialId}), ";
            } 
            $receivers = rtrim($receivers, ', ');
            $this->info("Birthday mail sent to: {$receivers}");
        } else {
            $this->info('Birthday mail cron done, no birthday mail sent today');
        }
    }

    private function shouldBirthdayMailBeSent(string $socialId): bool
    {
        $socialId = trim(str_replace('-', '', $socialId));
        $birthday = date("Y{$this->getDateFromSocailId($socialId)}");
        return ($birthday == date('Ymd'));
    }

    private function getDateFromSocailId(string $socialId): string
    {
        switch (strlen($socialId)) {
            case 10:
                return substr($socialId,2, 4);
            case 12:
                return substr($socialId,4, 4);
            default:
                return false;
        }
    }
}
