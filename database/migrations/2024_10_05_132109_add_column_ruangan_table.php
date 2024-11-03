<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('ruangan', function (Blueprint $table) {
            $table->string('id_fakultas', 30);
            $table->string('id_prodi', 30)->nullable();

            $table->foreign('id_fakultas')->references('id_fakultas')->on('fakultas')->onDelete('cascade');
            $table->foreign('id_prodi')->references('id_prodi')->on('program_studi')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ruangan', function (Blueprint $table) {
            $table->dropForeign(['id_fakultas']);
            $table->dropForeign(['id_prodi']);

            $table->dropColumn('id_fakultas');
            $table->dropColumn('id_prodi');
        });
    }
};